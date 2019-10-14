
from django.db.models import Avg, StdDev
from rest_framework import serializers
from api.models import BigPicture, BaseUser
import math


def median_value(queryset, term):
    count = queryset.count()
    if count == 0:
    	return 0
    return queryset.values_list(term, flat=True).order_by(term)[math.trunc(count/2)]


class BigPictureSerializer(serializers.ModelSerializer):
	children = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	family = serializers.PrimaryKeyRelatedField(many=True, read_only=True, required=False)
	kind = serializers.IntegerField()
	ratings = serializers.SerializerMethodField(read_only=True)

	class Meta:
		model = BigPicture
		fields = "__all__"

	def get_ratings(self, obj):
		res = []
		ratings = obj.ratings.all()
		for user in set([obj.author.id, self.context["author"], self.context["target"]]):
			rating = ratings.filter(author=user, target=obj)
			res.append({
				"author": user,
				"value": rating[0].value if rating.exists() else 0,
				"target": obj.id,
				"subject": obj.id if obj.subject is None else obj.subject.id,
				"date": rating[0].date if rating.exists() else None
			})
		return res
