<?php

/**
 * Builds the share card for /life-at-razinsoft: the four hero photos as one 1200x630 collage.
 *
 * A link preview shows a single image, so the four are composed into one rather than relying on
 * several og:image tags (which every platform collapses to the first anyway).
 *
 * Run from the project root after changing the hero photos:
 *   php scripts/build-life-og.php
 */
$srcs = [
    'public/images/life/hero/work-01.webp',
    'public/images/life/hero/ping-pong-02.webp',
    'public/images/life/hero/buffet-dinner-03.webp',
    'public/images/life/hero/event-04.webp',
];
$dest = 'public/images/life-at-razinsoft-og.jpg';

$W = 1200;
$H = 630;
$G = 10;                                            // gutter between the four

$out = imagecreatetruecolor($W, $H);
imagefill($out, 0, 0, imagecolorallocate($out, 255, 255, 255));

$cw = (int) (($W - $G) / 2);
$ch = (int) (($H - $G) / 2);
$cells = [[0, 0], [$cw + $G, 0], [0, $ch + $G], [$cw + $G, $ch + $G]];

foreach ($srcs as $i => $path) {
    if (! is_file($path)) {
        fwrite(STDERR, "missing: {$path}\n");
        exit(1);
    }

    $im = imagecreatefromwebp($path);
    $iw = imagesx($im);
    $ih = imagesy($im);

    // Cover-crop: fill the cell edge to edge without distorting the photo.
    $scale = max($cw / $iw, $ch / $ih);
    $sw = (int) round($cw / $scale);
    $sh = (int) round($ch / $scale);

    imagecopyresampled(
        $out, $im,
        $cells[$i][0], $cells[$i][1],
        (int) (($iw - $sw) / 2), (int) (($ih - $sh) / 2),
        $cw, $ch, $sw, $sh,
    );
}

imagejpeg($out, $dest, 84);
printf("%s — %dx%d, %d KB\n", $dest, $W, $H, (int) (filesize($dest) / 1024));
