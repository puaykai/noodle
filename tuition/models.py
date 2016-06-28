from __future__ import unicode_literals

from django.db import models, transaction
from django.contrib.auth.models import User
from django.core import serializers


class Question(models.Model):
    content = models.TextField()
    maximum_grade = models.IntegerField(default=0)


class Assignment(models.Model):
    CONDITION_OF_ASSSIGNMENT = (
        ('DR', 'draft'),
        ('RE', 'ready'),
        ('DO', 'done'),
        ('GR', 'graded'),
        ('VE', 'reviewed')
    )
    name = models.TextField()
    questions = models.ManyToManyField(Question, related_name="questions") # so that we can use questions from previous assignments
    graded = models.BooleanField(default=False)
    type = models.CharField(max_length=2, choices=CONDITION_OF_ASSSIGNMENT, default='DR')

    @classmethod
    def create_new_assignment(cls, assignment_dictionarys, tutor):
        """"json format is a list of dictionary. keys of each dictionary : content, max_grad"""""
        assignment = cls()
        for assignment_dictionary in assignment_dictionarys:
            question = Question(content=assignment_dictionary.get("content", ""), maximum_grade=assignment_dictionary.get("maximum_grade", ""))
            question.save()
            assignment.questions.add(question)
        assignment.save()
        tutor.assignments.add(assignment)

    @classmethod
    def get_assignment(cls, assignment_id):
        return serializers.serialize("json", cls.objects.filter(id=assignment_id))

    @classmethod
    def get_ungraded_assignment(cls, user):
        try:
            tutor = Tutor.objects.get(user=user)
        except:
            return ""
        return serializers.serialize("json", cls.objects.filter(graded=False, tutor=tutor))

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


class Student(models.Model):
    user = models.OneToOneField(User, related_name="student")
    assignments = models.ManyToManyField(Assignment, related_name="assignments")


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name="answer") # can have many answers, we allow for corrections
    content = models.TextField()
    grade = models.IntegerField(default=0)
    comment = models.TextField()
    graded = models.BooleanField(default=False)


class Tutor(models.Model):
    user = models.OneToOneField(User, related_name="tutor")
    students = models.ManyToManyField(Student, related_name="students")
    assignments = models.ManyToManyField(Assignment, related_name="assignments") # many to many so that later tutor can share assignment

