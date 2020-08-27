from django.db import models
from hashlib import md5


class Url(models.Model):
    original = models.CharField(max_length=100, blank=False, unique=True)
    tiny = models.CharField(max_length=100, blank=False)
    clicks = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_shortened_url(self):
        return self.original + ' shortens to ' + self.tiny

    def clicked(self):
        self.clicks += 1
        self.save()

    def save(self, *args, **kwargs):
        if not self.id:
            self.tiny = self.tiny+md5(self.original.encode()).hexdigest()[:10]

        return super().save(*args, **kwargs)
