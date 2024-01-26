from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

class UserRating(models.Model):
    user_id = models.IntegerField()  # Replace with your user model
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    rating = models.IntegerField()
