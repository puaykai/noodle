from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from models import Tutor, Student, Assignment, Question
from json import loads


def signup_login(request):
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
                    return HttpResponse("KEY_USER_ACCOUNT_DISABLED", status=200)
            else:
                return HttpResponse("KEY_INVALID_LOGIN", status=200)
        else:
            try:
                user = User.objects.create_user(username, "", password)
                user.save()
            except:
                return HttpResponse("KEY_CREATE_USER_FAILED", status=200)
            if request.POST.get('is_tutor'):
                try:
                    tutor = Tutor(user=user)
                    tutor.save()
                except:
                    return HttpResponse("KEY_CREATE_TUTOR_FAILED", status=200)
            else:
                try:
                    student = Student(user=user)
                    student.save()
                except:
                    return HttpResponse("KEY_CREATE_STUDENT_FAILED", status=200)
            login(request, user)
            return HttpResponse("KEY_CREATE_USER_SUCCESS", status=200)

@login_required
def new_assignment(request):
    if request.method == "POST" and request.POST.get("questions"):
        questions = loads(request.POST.get("questions"))
        if len(questions) > 0:
            try:
                tutor = Tutor.objects.get(user=request.user)
            except:
                return HttpResponse("KEY_NOT_A_TUTOR", status=200)
            Assignment.create_new_assignment(questions, tutor)
            return HttpResponse("KEY_CREATION_SUCCESSFUL", status=200)
        else:
            return HttpResponse("KEY_EMPTY_ASSIGNMENT_DICTIONARY", status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=200)

@login_required
def get_assignment(request):
    if request.method == "GET" and request.GET.get("assignment_id"):
        return HttpResponse(Assignment.get_assignment(request.GET.get("assignment_id")), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=200)

@login_required
def do_assignment(request):
    if request.method == "POST" and "answers" in request.POST and "assignment_id" in request.POST:
        answers = loads(request.POST.get("answers"))
        return HttpResponse(Assignment.do_assignment(answers, request.user, request.POST.get("assignment_id")), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=200)

@login_required
def get_ungraded_assignments(request):
    if request.method == "GET":
        return HttpResponse(Assignment.get_ungraded_assignment(request.user), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=200)

@login_required
def grade_assignment(request):
    if request.method == "POST" and "questions" in request.POST and "assignment_id" in request.POST:
        questions = loads(request.POST.get("questions"))
        Assignment.grade(questions, request.user, request.POST.get("assignment_id"))

@login_required
def get_graded_assignment(request):
    if request.method == "GET":
        return HttpResponse(Assignment.get_graded_assignment(request.user), status=200)
    else:
        return HttpResponse("KEY_BAD_REQUEST", status=200)

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
    pass

@login_required
def add_tutor(request):
    pass
