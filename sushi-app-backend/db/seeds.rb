# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Sushi.create(name: 'Maguro (Tuna)', image: "https://i.imgur.com/GQeDsvN.png", sushilevel: 'Sushi Novice', likes: 0)

Sushi.create(name: 'Chu-Toro (Med. fat tuna belly)', image: 'https://i.imgur.com/OWwBFqW.png', sushilevel: 'Sushi Veteran', likes: 0)

Sushi.create(name: 'Toro (Fatty tuna belly)', image: 'https://i.imgur.com/Rwwo8Cb.png', sushilevel: 'Sushi Veteran', likes: 0)
