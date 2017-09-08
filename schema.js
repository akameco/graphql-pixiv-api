const { buildSchema } = require('graphql')

const schema = buildSchema(`
type User {
  id: Int
  name: String
  account: String
  profileImageUrls: ProfileImageUrls
}

type ProfileImageUrls {
  medium: String
}

type Tag {
  name: String
}

type ImageUrls {
  squareMedium: String
  medium: String
  large: String
}

enum Mode {
  day
  week
  month
  day_male
  day_female
  week_original
  week_rookie
}

type MetaSinglePage {
  originalImageUrl: String
}

type Illust {
  id: Int
  title: String
  type: String
  caption: String
  tags: [Tag]!
  imageUrls: ImageUrls
  width: Int
  height: Int
  totalBookmarks: Int
  user: User
  tools: [String]
  metaSinglePage: MetaSinglePage
}

type Query {
  ranking(mode: Mode = "mode"): [Illust!]!
}
`)

module.exports = schema
