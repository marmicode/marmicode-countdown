export const now = () => Math.round(Date.now() / 1000);

export const playRandomMusic = (musicList) => {
  /* If no music list is given us default list. */
  /* More music here: https://www.unminus.com/ */
  musicList =
    musicList?.length > 0
      ? musicList
      : [
          'lemasculin-bitchy-goose.mp3',
          'music.mp3',
          'https://feeds.soundcloud.com/stream/1000622302-unminus-moon-landing-countdown.mp3',
          'https://feeds.soundcloud.com/stream/827208181-unminus-autumn-allure.mp3',
          'https://feeds.soundcloud.com/stream/554065455-unminus-jazz-mezzo.mp3',
          'https://feeds.soundcloud.com/stream/35354127-unminus-easy.mp3',
          'https://feeds.soundcloud.com/stream/265746727-unminus-pipo-interludo.mp3',
        ];
  const music = _pickRandomItem(musicList);
  const audio = new Audio(music);
  audio.play();
  /* Select a music that wasn't already played. */
  audio.addEventListener('ended', () =>
    playRandomMusic(musicList.filter((_music) => _music !== music))
  );
};

const _pickRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];
