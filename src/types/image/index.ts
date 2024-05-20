export default class ImageInterface {
  public id_img: string;
  public url: string;
  public title: string;
  public date: string;
  public explanation: string;
  public media_type: string;

  constructor(
    id_img: string,
    url: string,
    title: string,
    date: string,
    explanation: string,
    media_type: string
  ) {
    this.id_img = id_img;
    this.url = url;
    this.title = title;
    this.date = date;
    this.explanation = explanation;
    this.media_type = media_type;
  }
}
