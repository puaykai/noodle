from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from models import Tutor, Student, Assignment, Question, StudentAssignment
from json import loads, dumps


def signup_login(request):
    if request.method == "POST" and request.body:
        request.POST = loads(request.body)
        username = request.POST.get('username')
        password = request.POST.get('password')
        if User.objects.filter(username=username).exists():
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    if Tutor.objects.filter(user=user).exists():
                        return HttpResponse("KEY_IS_A_TUTOR", status=200)
                    else:
                        return HttpResponse("KEY_IS_A_STUDENT", status=200)
                else:
                    return HttpResponse("KEY_USER_ACCOUNT_DISABLED", status=400)
            else:
                return HttpResponse("KEY_INVALID_LOGIN", status=400)
        else:
            try:
                user = User.objects.create_user(username, "", password)
                user.save()
            except:
                return HttpResponse("KEY_CREATE_USER_FAILED", status=400)
            if request.POST.get('is_tutor') == 0:
                try:
                    tutor = Tutor(user=user)
                    tutor.save()
                except:
                    return HttpResponse("KEY_CREATE_TUTOR_FAILED", status=400)
            else:
                try:
                    student = Student(user=user)
                    student.save()
                except:
                    return HttpResponse("KEY_CREATE_STUDENT_FAILED", status=400)
            login(request, user)
            return HttpResponse("KEY_CREATE_USER_SUCCESS", status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def my_logout(request):
    try:
        logout(request)
        return HttpResponse("KEY_LOGOUT_SUCCESSFUL", status=200)
    except:
        return HttpResponse("KEY_LOGOUT_FAILED", status=400)

@login_required
def new_assignment(request):
    if request.method == "POST" and request.body:
        request.POST = loads(request.body)
        questions = request.POST.get("questions")
        if len(questions) > 0:
            try:
                tutor = Tutor.objects.get(user=request.user)
            except:
                return HttpResponse("KEY_NOT_A_TUTOR", status=400)
            Assignment.create_new_assignment(questions, tutor, request.POST.get("name", ""), request.POST.get("due_date", ""))
            return HttpResponse("KEY_CREATION_SUCCESSFUL", status=200)
        else:
            return HttpResponse("KEY_EMPTY_ASSIGNMENT_DICTIONARY", status=400)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def get_assignment(request):
    if request.method == "POST" and request.body:
        request.POST = loads(request.body)
        return HttpResponse(Assignment.get_assignment(request.POST.get("assignment_id")), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def do_assignment(request):
    if request.method == "POST" and request.body:
        request.POST = loads(request.body)
        answers = request.POST.get("answers")
        if Assignment.do_assignment(answers, request.user, request.POST.get("assignment_id")):
            return HttpResponse("SAVE_ASSIGNMENT_SUCCESS", status=200)
        else:
            return HttpResponse("SAVE_ASSIGNMENT_FAILED", status=400)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def get_ungraded_assignments(request):
    if request.method == "GET":
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse("KEY_NOT_A_TUTOR", status=400)
        return HttpResponse(Assignment.get_ungraded_assignment(tutor), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def grade_assignment(request):
    if request.method == "POST" and request.body:
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse("KEY_YOU_ARE_NOT_TUTOR", status=400)
        request.POST = loads(request.body)
        if "answers" in request.POST and "assignment_id" in request.POST and "student_id" in request.POST:
            try:
                assignment = Assignment.objects.get(id=request.POST.get("assignment_id"))
            except:
                return HttpResponse("KEY_NO_SUCH_ASSIGNMENT", status=400)
            try:
                student = Student.objects.get(id=request.POST.get("student_id"))
            except:
                return HttpResponse("KEY_NO_SUCH_STUDENT", status=400)
            if StudentAssignment.objects.filter(student=student, assignment=assignment).exists():
                return HttpResponse(Assignment.grade(tutor, assignment, student, request.POST.get('answers')), status=200)
            else:
                return HttpResponse("KEY_STUDENT_DOES_NOT_HAVE_ASSIGNMENT", status=400)
        else:
            return HttpResponse("KEY_MISSING_PARAMS", status=400)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def get_graded_assignment(request):
    if request.method == "GET":
        return HttpResponse(Assignment.get_graded_assignment(request.user), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def get_assignments(request): # number of people completed for each assignment
    if request.method == "GET":
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse("KEY_TUTOR_DOES_NOT_EXIST", status=400)
        return HttpResponse(Tutor.get_ungraded_assignment(tutor), status=200)
    else:
        return HttpResponse("KEY_BAD_RESPONSE", status=400)

@login_required
def get_students(request): # students with a score for each assignment and total score
    if request.method == "GET":
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse("KEY_TUTOR_DOES_NOT_EXIST", status=400)
        return HttpResponse(Tutor.get_accepted_students(tutor), status=200)
    else:
        return HttpResponse("KEY_BAD_RESPONSE", status=400)

@login_required
def get_due_assignments(request):
    if request.method == "GET":
        try:
            student = Student.objects.get(user=request.user)
        except:
            return HttpResponse("KEY_USER_IS_NOT_A_STUDENT", status=400)
        print "due assignments : %s" % Student.get_due_assignments(student)
        return HttpResponse(Student.get_due_assignments(student), status=200)
    else:
        return HttpResponse("KEY_BAD_RESPONSE", status=400)

@login_required
def get_completed_assignments(request):
    if request.method == "GET":
        try:
            student = Student.objects.get(user=request.user)
        except:
            return HttpResponse("KEY_USER_IS_NOT_A_STUDENT", status=400)
        return HttpResponse(Student.get_completed_assignments(student), status=200)
    else:
        return HttpResponse("KEY_BAD_RESPONSE", status=400)

@login_required
def get_leaderboard(request):
    if request.method == "POST" and "assignment_id" in request.POST:
        try:
            student = Student.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NO_SUCH_STUDENT', status=400)
        # TODO
    else:
        return HttpResponse("KEY_BAD_RESPONSE", status=400)

@login_required
def get_tutors(request):
    if request.method == "GET":
        try:
            student = Student.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NO_SUCH_STUDENT', status=400)
        return HttpResponse(dumps({
            "confirmed_tutors": Student.get_confirmed_tutors(student),
            "pending_tutors": Student.get_pending_tutors(student)
        }), status=200)
    else:
        return HttpResponse("KEY_BAD_RESPONSE", status=200)

@login_required
def add_tutor(request):
    if request.method == "POST" and request.body and request.user:
        request.POST = loads(request.body)
        try:
            tutor = Tutor.objects.get(id=request.POST.get('tutor_id'))
        except:
            return HttpResponse('KEY_NO_SUCH_TUTOR', status=400)
        try:
            student = Student.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NO_SUCH_STUDENT', status=400)
        student.requested_tutors.add(tutor)
        return HttpResponse("KEY_ADD_TUTOR_SUCCESSFUL", status=200)
    else:
        return HttpResponse('KEY_BAD_RESPONSE', status=400)

@login_required
def get_requesting_students(request):
    if request.method == "GET":
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NOT_A_TUTOR', status=400)
        return HttpResponse(Tutor.get_requesting_students(tutor), status=200)
    else:
        return HttpResponse('KEY_BAD_REQUEST', status=400)

@login_required
def accept_student(request):
    if request.method == "POST" and request.body:
        request.POST = loads(request.body)
        try:
            student = Student.objects.get(id=request.POST.get('student_id'))
        except:
            return HttpResponse('KEY_NO_SUCH_STUDENT', status=400)
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NO_SUCH_TUTOR', status=400)
        if student.requested_tutors.filter(id=tutor.id).exists():
            student.requested_tutors.remove(tutor)
            tutor.accepted_students.add(student)
            student.save()  # TODO is this necessary?
            for assignment in tutor.assignments.all():
                StudentAssignment(student=student, assignment=assignment).save()
            return HttpResponse('KEY_ACCEPT_STUDENT_SUCCESS', status=200)
        else:
            return HttpResponse('KEY_STUDENT_DID_NOT_REQUEST_FOR_TUTOR', status=400)
    else:
        return HttpResponse('KEY_BAD_REQUEST', status=400)

