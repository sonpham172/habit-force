import * as ImageManipulator from 'expo-image-manipulator';

export async function compressImage(uri: string): Promise<any> {
  let compress = 0.9;
  let result = null;

  // Try until image is under 2MB or quality too low
  while (compress >= 0.1) {
    result = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress, format: ImageManipulator.SaveFormat.PNG }
    );

    const imageInfo = await fetch(result.uri);
    const blob = await imageInfo.blob();

    if (blob.size < 2 * 1024 * 1024) {
      return {
        uri: result.uri,
        type: 'image/*',
        name: 'avatar.jpg',
      };
    }

    compress -= 0.1;
  }

  throw new Error('Unable to compress image below 2MB');
}
