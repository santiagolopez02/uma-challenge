/**
 * Get name image according url
 * @param url
 * @example: url:https://apod.nasa.gov/apod/image/2208/NGC6946_960.jpg
 * @returns string
 */
export default function getNameImage(url: string): string {
  const urlObject = new URL(url);

  const pathname = urlObject.pathname;
  const segments = pathname.split("/");

  const imageNameWithExtension: string = segments.pop() || "";

  return imageNameWithExtension;
}
