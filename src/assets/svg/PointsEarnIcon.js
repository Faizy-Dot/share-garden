import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
const PointsEarnIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={16}
    height={9}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h16v9H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.03571 0 0 .0635 0 -.008)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAQCAYAAAAFzx/vAAAABHNCSVQICAgIfAhkiAAAAYlJREFUOI2t0r9LAmEYB/Dvc3gmkWFDR2SUFKTg6NhgDgVBudS5tBtCDUFTe3OBQxj0D6gtFgRK6BJNjREKhkNJ2JBYiD/Ap6HOTj31FL/bvTw8n/u+vIQRZv7UHQaz3HVAIJ8wSlBPDKNcJjAeGkTK5yKYXe0z1H4witiCqw6uc5LBM61/pPNKnWHZuHDmPrFfes2DYgR6bzH1YN+vhStu8HGlVLzthWpgNyA60g06w7Lx660QZfAmADBjpRvacY1E1xNz0jYT13SBCgbmLfW5FqqFma3SzpMvUmtbq/1oOjBCXoCwy9wIMbD8uxP3pknLRrVcsurFNBtqYQZR9OQOUymTOOYhIKNqmmjDYr2wjoZ/WATMXjX2sn+XUWbswbXZSr2aVJr+b6KY2SrJvbCWhq6QX+yHAUD6IJFXNx0EazZ0hfziRzkd7Yep02xKeJ4ed8iPexf1fhgA0DCYkqXzdcki2D71YgBgKDZyU8Ts4AExAMgG4gW9kBIhG4gXTOKYh4hSg2DD5gfaufs3LouWiAAAAABJRU5ErkJggg=="
        id="b"
        width={28}
        height={16}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
)
export default PointsEarnIcon;
