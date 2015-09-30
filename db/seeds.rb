# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

script1 = Script.create(title: '不動産屋')
Sentence.create([
  { actor: Sentence.actors[:whole], action: Sentence.actions[:message], message: '福田さん、このたびはご結婚おめでとうございます！', script: script1 },
  { actor: Sentence.actors[:tsukkomi], action: Sentence.actions[:message], message: 'どうも～、U字工事です、よろしくお願いしま〜す', script: script1 },
  { actor: Sentence.actors[:boke], action: Sentence.actions[:message], message: 'よろしくお願いします、いやあ', script: script1 },
])

script2 = Script.create(title: 'ペット')
Sentence.create([
  { actor: Sentence.actors[:tsukkomi], action: Sentence.actions[:message], message: 'どうも～、おめでとうございま～す！', script: script2 },
  { actor: Sentence.actors[:boke], action: Sentence.actions[:bokeru], message: 'どうも～、おめでとうございま～す、', script: script2 },
  { actor: Sentence.actors[:tsukkomi], action: Sentence.actions[:tsukkomu], message: 'いやいや、ね～、', script: script2 },
])
