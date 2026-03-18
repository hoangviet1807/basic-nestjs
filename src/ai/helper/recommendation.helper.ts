export function mapWeatherToDrinkTag(weather) {
  const temp = weather.temperature;

  if (temp >= 30) {
    return 'REFRESHING_DRINK';
  }

  if (temp >= 25 && temp < 30) {
    return 'LIGHT_COFFEE';
  }

  if (temp < 25) {
    return 'HOT_DRINK';
  }

  return 'SIGNATURE_DRINK';
}
