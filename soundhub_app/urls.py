from django.urls import path
from .views import SongListCreateView, SongRetrieveUpdateDeleteView

urlpatterns = [
    path('api/songs/', SongListCreateView.as_view(), name='song-list-create'),
    path('api/songs/<int:pk>/', SongRetrieveUpdateDeleteView.as_view(), name='song-retrieve-update-delete'),
]
