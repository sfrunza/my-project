# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
User.create(email_address: "frunza.sergiu3@gmail.com", first_name: "Sergiu", last_name: "Frunza", password: "111111", role: "admin")

10.times do |i|
  Post.create(title: "Post #{i}", body: "Body of post #{i}")
end
