from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from models import Tutor, Student, Assignment, Question
from json import loads, dumps


def signup_login(request):
    print "method : %s and POST : %s" % (request.method, request.POST)
    if request.method == "POST" and request.POST.get('username') and request.POST.get('password'):
        username = request.POST.get('username')
        password = request.POST.get('password')
        if User.objects.filter(username=username).exists():
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse("KEY_LOGIN_SUCCESS", status=200)
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
            if request.POST.get('is_tutor') == '0':
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
    if request.method == "POST" and request.POST.get("questions"):
        questions = loads(request.POST.get("questions"))
        if len(questions) > 0:
            try:
                tutor = Tutor.objects.get(user=request.user)
            except:
                return HttpResponse("KEY_NOT_A_TUTOR", status=400)
            Assignment.create_new_assignment(questions, tutor)
            return HttpResponse("KEY_CREATION_SUCCESSFUL", status=200)
        else:
            return HttpResponse("KEY_EMPTY_ASSIGNMENT_DICTIONARY", status=400)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def get_assignment(request):
    if request.method == "GET" and request.GET.get("assignment_id"):
        return HttpResponse(Assignment.get_assignment(request.GET.get("assignment_id")), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def do_assignment(request):
    if request.method == "POST" and "answers" in request.POST and "assignment_id" in request.POST:
        answers = loads(request.POST.get("answers"))
        return HttpResponse(Assignment.do_assignment(answers, request.user, request.POST.get("assignment_id")), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def get_ungraded_assignments(request):
    if request.method == "GET":
        return HttpResponse(Assignment.get_ungraded_assignment(request.user), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=400)

@login_required
def grade_assignment(request):
    if request.method == "POST" and "questions" in request.POST and "assignment_id" in request.POST:
        questions = loads(request.POST.get("questions"))
        Assignment.grade(questions, request.user, request.POST.get("assignment_id"))
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
    pass

@login_required
def get_students(request): # students with a score for each assignment and total score
    pass

@login_required
def get_due_assignments(request):
    pass

@login_required
def get_completed_assignments(request):
    pass

@login_required
def get_leaderboard(request):
    pass

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

@login_required
def add_tutor(request):
    if request.method == "POST" and request.POST.get('tutor_id') and request.user:
        try:
            tutor = Tutor.objects.get(id=request.POST.get('tutor_id'))
        except:
            return HttpResponse('KEY_NO_SUCH_TUTOR', status=400)
        try:
            student = Student.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NO_SUCH_STUDENT', status=400)
        student.requested_tutors.add(tutor)
        student.save()
        return HttpResponse("KEY_ADD_TUTOR_SUCCESSFUL", status=200)
    else:
        return HttpResponse('KEY_BAD_RESPONSE', status=400)

@login_required
def get_requesting_students(request):
    try:
        tutor = Tutor.objects.get(user=request.user)
    except:
        return HttpResponse('KEY_NOT_A_TUTOR', status=400)
    return Tutor.get_requesting_students(tutor)

@login_required
def accept_student(request):
    if request.method == "POST" and request.POST.get('student_id'):
        try:
            student = Student.objects.get(id=request.POST.get('student_id'))
        except:
            return HttpResponse('KEY_NO_SUCH_STUDENT', status=400)
        try:
            tutor = Tutor.objects.get(user=request.user)
        except:
            return HttpResponse('KEY_NO_SUCH_TUTOR', status=400)
        try:
            student.requested_tutors.get(tutor)
        except:
            return HttpResponse('KEY_STUDENT_DID_NOT_REQUEST_FOR_TUTOR', sttus=400)
        student.requested_tutors.remove(tutor)
        tutor.accepted_students.add(student)
        student.save()
        tutor.save()
        return HttpResponse('KEY_ACCEPT_STUDENT_SUCCESS', status=200)
    else:
        return HttpResponse('KEY_BAD_REQUEST', status=400)
