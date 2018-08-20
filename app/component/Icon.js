import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const isBadgeTextLong = badgeText => badgeText.length > 1 || badgeText > 9;

const IconBadge = ({ badgeFill, badgeText }) => {
  if (!badgeFill || !badgeText) {
    return null;
  }
  return (
    <svg className="icon-badge" viewBox="0 0 40 40">
      <circle
        className="badge-circle"
        cx="20"
        cy="20"
        fill={badgeFill}
        r="20"
      />
      <text
        className={cx('badge-text', {
          long: isBadgeTextLong(badgeText),
        })}
        dy="0.1em"
        x="20"
        y="20"
      >
        {badgeText}
      </text>
    </svg>
  );
};

IconBadge.propTypes = {
  badgeFill: PropTypes.string,
  badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

IconBadge.defaultProps = {
  badgeFill: undefined,
  badgeText: undefined,
};

IconBadge.asString = (badgeFill, badgeText) => {
  if (!badgeFill || !badgeText) {
    return '';
  }
  return `
  <svg class="icon-badge" viewBox="0 0 40 40">
    <circle class="badge-circle" cx="20" cy="20" fill="${badgeFill}" r="20"/>
    <text class="${cx('badge-text', {
      long: isBadgeTextLong(badgeText),
    })}" dy="0.1em" x="20" y="20">${badgeText}</text>
  </svg>`;
};

function Icon(props) {
  return (
    <span aria-hidden className="icon-container">
      <svg
        id={props.id}
        style={{
          fill: props.color ? props.color : null,
          pointerEvents: props.pointerEvents ? 'auto' : 'none',
        }}
        viewBox={props.viewBox}
        className={cx('icon', props.className)}
      >
        <use xlinkHref={`#${props.img}`} />
      </svg>
      <IconBadge badgeFill={props.badgeFill} badgeText={props.badgeText} />
    </span>
  );
}

Icon.propTypes = {
  badgeFill: PropTypes.string,
  badgeText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  pointerEvents: PropTypes.bool,
  viewBox: PropTypes.string,
};

Icon.defaultProps = {
  badgeFill: undefined,
  badgeText: undefined,
  className: undefined,
  color: undefined,
  id: undefined,
  pointerEvents: false,
  viewBox: '0 0 40 40',
};

Icon.asString = (
  img,
  className,
  id,
  badgeFill = undefined,
  badgeText = undefined,
) => `
  <span class="icon-container">
    <svg
      ${id ? ` id=${id}` : ''}
      viewBox="0 0 40 40"
      class="${cx('icon', className)}"
    >
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${img}"/>
    </svg>
    ${IconBadge.asString(badgeFill, badgeText)}
  </span>
`;

Icon.displayName = 'Icon';
Icon.description = 'Shows an icon from the SVG sprite';
export default Icon;
