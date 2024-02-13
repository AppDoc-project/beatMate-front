const mapEnglishToKorean = (englishSpeciality) => {
  const specialityMapping = {
    PIANO: '피아노',
    GUITAR: '기타',
    VOCAL: '보컬',
    DRUM: '드럼',
    BASS: '베이스',
    MUSIC_THEORY: '음악이론',
    COMPOSITION: '작곡',
    WIND_INSTRUMENT: '관악기',
    STRING_INSTRUMENT: '현악기',
    KEYBOARD_INSTRUMENT: '건반악기',
  };

  return specialityMapping[englishSpeciality] || englishSpeciality;
};

export { mapEnglishToKorean };
