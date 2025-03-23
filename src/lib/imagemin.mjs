import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const imageDirs = [
  'src/img/geolocation',
];

for(const dir of imageDirs) {
  await imagemin([`${dir}/*.{jpg,png}`], {
    destination: `${dir}`,
    plugins: [
      imageminWebp({quality: 80})
    ]
  });
}

