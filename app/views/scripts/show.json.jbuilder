json.title @script.title
json.sentences do |json|
  json.array!(@script.sentences) do |sentence|
    json.actor Sentence.actors[sentence.actor]
    json.action Sentence.actions[sentence.action]
    json.message sentence.message
  end
end
