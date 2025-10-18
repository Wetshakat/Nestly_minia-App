from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin

class CreatorChoice(models.TextChoices):
    INDIVIDUAL = 'Individual','independent'
    COMPANY = 'Company','company'

class TourCreatorManager(BaseUserManager):
    def create_user(self,username,email,password=None,**kwargs):
        if username is None:
            raise TypeError('username is required')
        if email is None:
            raise TypeError('email field is not set')
        if password is None:
            raise TypeError('password is not pass')
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,**kwargs)
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self,username,email,password=None,**kwargs):
        user = self.create_user(username,email,password,**kwargs)
        user.is_staff = True
        user.is_superuser= True
        user.save(using=self.db)
        return user        

class TourCreator(AbstractBaseUser,PermissionsMixin):
    "a model to create local tour creator user"
    username = models.CharField(max_length=80,db_index=True,unique=True)
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.EmailField(db_index=True,unique=True)
    type = models.CharField(max_length=15,choices=CreatorChoice.choices,default=CreatorChoice.INDIVIDUAL)
    address = models.CharField(blank=True,null=True)
    phone = models.IntegerField(blank=True,null=True)
    company_name = models.CharField(max_length=150)
    reg_no  = models.CharField()
    is_approved = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = ["username"]
    USERNAME_FIELD = "email"
    objects = TourCreatorManager()
