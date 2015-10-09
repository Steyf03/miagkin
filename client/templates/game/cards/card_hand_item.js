Template.cardHandItem.helpers
({
	leftToString : function()
	{
		var leftToString = "";
		for(var i = 0; i < this.left.length; i++)
		{
			leftToString += this.left[i];
			if(i < this.left.length - 1) leftToString += ", ";
		}
		return leftToString;
	},
	rightToString: function()
	{
		return this.right + " pièces d'or";
	},
	bonusToString: function()
	{
		var bonusToString = "";
		for(var i = 0; i < this.right.length; i++)
		{
			if(this.right[i].type == 'a')
			{
				bonusToString = this.right[i].value + " pièces d'or";
			}
			if(this.right.length > 1)
			{
				if(this.right[i].type == 'b')
				{
					bonusToString += " et " + this.right[i].value + " niveaux";
				}
			}
			if(this.right[i].type == '') bonusToString = this.right[i].value + " pièces d'or";
		}
		return bonusToString;
	},
	conditionToString : function()
	{
		if(this.condition.charAt(0) == '0')
		{
			return "Réservé aux " + this.condition.substr(1) + "s";
		}
		else if(this.condition.charAt(0) == '1')
		{
			return "Interdit aux " + this.condition.substr(1) + "s";
		}
		else
		{
			return "";
		}
	}
});