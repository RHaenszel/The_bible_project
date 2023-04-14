from django.db import models
from django.contrib.auth.models import AbstractUser


class App_User(AbstractUser):
    email = models.EmailField( blank = False, null = False, unique = True )
    first_name = models.CharField( max_length=155, blank=True )
    last_name = models.CharField( max_length=155, blank=True )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return f"{self.first_name} | {self.last_name} | {self.email} "    
 
 
 
class Bible_Journals(models.Model):
    title = models.CharField(max_length=250, blank=False, null=False)
    name_bible = models.CharField(max_length=40, blank=False, null=False)
    book = models.CharField(max_length=40, blank=False, null=False)
    chapter = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()
    journal_entry = models.TextField(blank=False)
    user_fk = models.ForeignKey('App_User', on_delete=models.CASCADE, related_name='bible_journal')
 
    def __str__(self):
        return f"{self.title} | {self.user_fk} | {self.book}"
    
    
    # class AbstractUser(AbstractBaseUser, PermissionsMixin):
    # """
    # An abstract base class implementing a fully featured User model with
    # admin-compliant permissions.

    # Username and password are required. Other fields are optional.
    # """

    # username_validator = UnicodeUsernameValidator()

    # username = models.CharField(
    #     _("username"),
    #     max_length=150,
    #     unique=True,
    #     help_text=_(
    #         "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    #     ),
    #     validators=[username_validator],
    #     error_messages={
    #         "unique": _("A user with that username already exists."),
    #     },
    # )
    # first_name = models.CharField(_("first name"), max_length=150, blank=True)
    # last_name = models.CharField(_("last name"), max_length=150, blank=True)
    # email = models.EmailField(_("email address"), blank=True)
    # is_staff = models.BooleanField(
    #     _("staff status"),
    #     default=False,
    #     help_text=_("Designates whether the user can log into this admin site."),
    # )
    # is_active = models.BooleanField(
    #     _("active"),
    #     default=True,
    #     help_text=_(
    #         "Designates whether this user should be treated as active. "
    #         "Unselect this instead of deleting accounts."
    #     ),
    # )
    # date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    # objects = UserManager()

    # EMAIL_FIELD = "email"
    # USERNAME_FIELD = "username"
    # REQUIRED_FIELDS = ["email"]

    # class Meta:
    #     verbose_name = _("user")
    #     verbose_name_plural = _("users")
    #     abstract = True

    # def clean(self):
    #     super().clean()
    #     self.email = self.__class__.objects.normalize_email(self.email)

    # def get_full_name(self):
    #     """
    #     Return the first_name plus the last_name, with a space in between.
    #     """
    #     full_name = "%s %s" % (self.first_name, self.last_name)
    #     return full_name.strip()

    # def get_short_name(self):
    #     """Return the short name for the user."""
    #     return self.first_name

    # def email_user(self, subject, message, from_email=None, **kwargs):
    #     """Send an email to this user."""
    #     send_mail(subject, message, from_email, [self.email], **kwargs)
