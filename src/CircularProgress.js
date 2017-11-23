
import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Platform, ART } from 'react-native';
const { Surface, Shape, Path, Group } = ART;
import MetricsPath from 'art/metrics/path';

export default class CircularProgress extends React.Component {

  circlePath(cx, cy, r, startDegree, endDegree, clockwise) {

    let p = Path();
//    if (Platform.OS === 'ios') {
      p.path.push(0, cx + r, cy);
      p.path.push(4, cx, cy, r, (360 - startDegree) * Math.PI / 180, (360 - endDegree) * Math.PI / 180, 0);
      //p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, endDegree * Math.PI / 180, 1);
      
//    } else {
//      // For Android we have to resort to drawing low-level Path primitives, as ART does not support 
//      // arbitrary circle segments. It also does not support strokeDash.
//      // Furthermore, the ART implementation seems to be buggy/different than the iOS one.
//      // MoveTo is not needed on Android 
//      let diff = clockwise ? endDegree : (startDegree - endDegree);
//      p.path.push(0, cx + r, cy);
//      p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, diff * Math.PI / 180, 0);
    return p;
  }

  extractFill(fill) {
    return Math.min(100, Math.max(0, fill));
  }

  render() {
    const { size, width, tintColor, backgroundColor, style, rotation, linecap, children, direction } = this.props;
    const backgroundPath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 359.99);

    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360 * fill / 100, direction == 'clockwise');

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}>
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
            <Shape d={backgroundPath}
                   stroke={backgroundColor}
                   strokeWidth={backgroundWidth != null ? backgroundWidth : width}/>
            <Shape d={circlePath}
                   stroke={tintColor}
                   strokeWidth={width}
                   strokeCap={linecap}/>
          </Group>
        </Surface>
        {
          children && children(fill)
        }
      </View>
    )
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  children: PropTypes.func,
  direction: PropTypes.oneOf(['clockwise', 'anti-clockwise']),
  linecap: PropTypes.string
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  orientation: 'clockwise',
  linecap: 'butt'
}
