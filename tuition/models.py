from __future__ import unicode_literals

from django.db import models, transaction
from django.db.models import Avg, Sum, FloatField
from django.contrib.auth.models import User
from django.core import serializers
from json import dumps
from util import MyEncoder


class Question(models.Model):
    content = models.TextField(default="")
    maximum_grade = models.IntegerField(default=0)


class Assignment(models.Model):
    CONDITION_OF_ASSSIGNMENT = (
        ('DR', 'draft'),
        ('RE', 'ready'),
        ('DO', 'done'),
        ('GR', 'graded'),
        ('VE', 'reviewed')
    )
    name = models.TextField(default="")
    questions = models.ManyToManyField(Question, related_name="questions") # so that we can use questions from previous assignments
    type = models.CharField(max_length=2, choices=CONDITION_OF_ASSSIGNMENT, default='DR')
    due_date = models.DateTimeField(auto_now=True)

    @classmethod
    def create_new_assignment(cls, assignment_dictionarys, tutor, name, due_date): # TODO did not add name and due date
        """"json format is a list of dictionary. keys of each dictionary : content, max_grad"""""
        assignment = cls(type='RE', name=name, due_date=due_date) # include in the next version, draft assignment
        assignment.save()
        for assignment_dictionary in assignment_dictionarys:
            question = Question(content=assignment_dictionary.get("content", ""), maximum_grade=assignment_dictionary.get("maximum_grade", ""))
            question.save()
            assignment.questions.add(question)
        tutor.assignments.add(assignment)

    @classmethod
    def get_assignment(cls, assignment_id):
        return dumps(list(cls.objects.filter(id=assignment_id)
                          .values('name',
                                       'questions__content',
                                       'questions__maximum_grade',
                                       'questions__answer__content',
                                       'questions__answer__grade',
                                       'questions__answer__comment',
                                       'questions__answer__graded')))

    @classmethod
    def get_ungraded_assignment(cls, tutor):
        return dumps(list(cls.objects.filter(type='RE', tutor_assignments=tutor)
                          .values('id', 'name', 'due_date')), cls=MyEncoder)

    @classmethod
    def get_graded_assignment(cls, user):
        try:
            student = Student.objects.get(user=user)
        except:
            return ""
        return serializers.serialize("json", cls.objects.filter(graded=True, graded_assignments=student))

    @classmethod
    def do_assignment(cls, answers_dictionary, user, assignment_id):
        if Student.objects.filter(user=user).exists():
            try:
                assignment = Assignment.objects.get(id=assignment_id)
            except:
                return ""
            for answer_dictionary in answers_dictionary:# {question_id, answer}
                question = assignment.questions.get(id=answer_dictionary.get("question_id"))
                Answer(question=question, content=answer_dictionary.get("answer")).save()
            assignment.type = "DO"
            assignment.save()

    @classmethod
    def grade(cls, questions_dictionary, user, assignment_id):
        if Tutor.objects.filter(user=user).exists():
            try:
                assignment = Assignment.objects.get(id=assignment_id)
            except:
                return ""
            for question_dictionary in questions_dictionary:# {question_id, grade, comment}
                question = assignment.question.get(id=question_dictionary.get("question_id"))
                answers = Answer.objects.filter(question=question, graded=False)
                for answer in answers.iterator():
                    answer.grade = question_dictionary.get("grade")
                    answer.comment = question.dictionary.get("comment")
                    answer.save()
            assignment.type = "GR"
            assignment.save()


class Student(models.Model):
    user = models.OneToOneField(User, related_name="student")
    # assignments = models.ManyToManyField(Assignment, related_name="student_assignments")

    @classmethod
    def get_confirmed_tutors(cls, student):
        return serializers.serialize('json', student.accepted_tutors.all())

    @classmethod
    def get_pending_tutors(cls, student):
        return serializers.serialize('json', student.requested_tutors.all())

    @classmethod
    def get_due_assignments(cls, student):
        return dumps(list(Assignment.objects.filter(tutor_assignments__in=student.accepted_tutors.all(), type='RE')
                          .values('id', 'name', 'due_date')), cls=MyEncoder)

    @classmethod
    def get_completed_assignments(cls, student):
        # return serializers.serialize('json', student.assignments.filter(type="GR"))
        # return dumps(list(student.assignments.filter(type="GR")
        #                   .values('id', 'name')))
        return dumps(list(Assignment.objects.filter(tutor_assignments__in=student.accepted_tutors.all(), type='GR')
                          .values('id', 'name', 'due_date')), cls=MyEncoder)

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name="answer") # can have many answers, we allow for corrections
    content = models.TextField(default="")
    grade = models.IntegerField(default=0)
    comment = models.TextField(default="")
    graded = models.BooleanField(default=False)


class Tutor(models.Model):
    user = models.OneToOneField(User, related_name="tutor")
    accepted_students = models.ManyToManyField(Student, related_name="accepted_tutors")
    requesting_students = models.ManyToManyField(Student, related_name="requested_tutors")
    assignments = models.ManyToManyField(Assignment, related_name="tutor_assignments") # many to many so that later tutor can share assignment

    @classmethod
    def get_requesting_students(cls, tutor):
        # print dumps(list(tutor.requesting_students.annotate(
        #     average_assignment_percentage=Avg(Sum('assignments__questions__answer__grade')/
        #                                       Sum('assignments__questions__maximum_grade'), output_field=FloatField()))
        #                  .values_list('user__username', "user__avatar", "average_assignment_percentage")))

        # TODO write query to handle avarge score calculation
        return dumps(list(tutor.requesting_students.values('id', 'user__username', 'user__profile__avatar')))

    @classmethod
    def get_accepted_students(cls, tutor):
        # return serializers.serialize("json", tutor.accepted_students.all())
        # TODO write query to handle avarge score calculation
        return dumps(list(tutor.accepted_students.values('id', 'user__username', 'user__profile__avatar')))

    @classmethod
    def get_assignment(cls, tutor):
        return serializers.serialize("json", tutor.assignments.all())
