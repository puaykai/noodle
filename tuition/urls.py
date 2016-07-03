from django.conf.urls import url
from . import views

app_name = 'tuition'
urlpatterns = [
    url(r'^login/$', views.signup_login, name='login'),
    url(r'^logout/$', views.my_logout, name='logout'),
    url(r'^new_assignment/$', views.new_assignment, name='new_assignment'),
    url(r'^get_assignment/$', views.get_assignment, name='get_assignment'),
    url(r'^do_assignment/$', views.do_assignment, name='do_assignment'),
    url(r'^get_ungraded_assignment/$', views.get_ungraded_assignments, name='get_ungraded_assignments'),
    url(r'^grade_assignment/$', views.grade_assignment, name='grade_assignment'),
    url(r'^get_graded_assignment/$', views.get_graded_assignment, name='get_graded_assignment'),
    url(r'^get_assignments/$', views.get_assignments, name='get_assignments'),
    url(r'^get_students/$', views.get_students, name='get_students'),
    url(r'^get_due_assignments/$', views.get_due_assignments, name='get_due_assignments'),
    url(r'^get_completed_assignments/$', views.get_completed_assignments, name='get_completed_assignments'),
    url(r'^get_leaderboard/$', views.get_leaderboard, name='get_leaderboard'),
    url(r'^get_tutors/$', views.get_tutors, name='get_tutors'),
    url(r'^add_tutor/$', views.add_tutor, name='add_tutor'),
]