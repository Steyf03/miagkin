if (Cards.find().count() === 0) {
	Cards.insert({
		deck: 'tresor',
		type: 'equipement',
		name: 'Bandana de Gros Dur',
		desc: '',
		image: '',
		left: ['Couvre-chef'],
		right: 400,
		bonus: [
			{
				value: 3,
				type: ''
			}
		],
		condition: '0humain'		
	});
	Cards.insert({
		deck: 'tresor',
		type: 'equipement',
		name: 'Armure de Mithril',
		desc: '',
		image: '',
		left: ['Armure', 'Gros'],
		right: 600,
		bonus: [
			{
				value: 3,
				type: ''
			}
		],
		condition: '1magicien'
	});
	Cards.insert({
		deck: 'tresor',
		type: 'equipement',
		name: 'Escabeau',
		desc: '',
		image: '',
		left: ['Gros'],
		right: 400,
		bonus: [
			{
				value: 3,
				type: ''
			}
		],
		condition: '0halfelin'
	});
}