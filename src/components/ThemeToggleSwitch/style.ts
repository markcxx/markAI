import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  input: css`
    width: 0;
    height: 0;
    opacity: 0;
  `,

  moon: css`
    svg {
      position: absolute;
      z-index: 1;
      inset-block-start: 5px;
      inset-inline-start: 5px;

      width: 24px;
      height: 24px;

      fill: #73c0fc;

      animation: tilt 5s linear infinite;
    }

    @keyframes tilt {
      0% {
        transform: rotate(0deg);
      }

      25% {
        transform: rotate(-10deg);
      }

      75% {
        transform: rotate(10deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  `,

  slider: css`
    cursor: pointer;

    position: absolute;
    inset-block: 0 0;
    inset-inline: 0 0;

    border-radius: 30px;

    background-color: #73c0fc;

    transition: 0.4s;

    &::before {
      content: '';

      position: absolute;
      z-index: 2;
      inset-block-end: 2px;
      inset-inline-start: 2px;

      width: 30px;
      height: 30px;
      border-radius: 20px;

      background-color: #e8e8e8;

      transition: 0.4s;
    }
  `,

  // Additional styles for checked state are handled in the slider class
  sliderChecked: css`
    background-color: #183153;

    &::before {
      transform: translateX(30px);
    }
  `,

  sliderFocus: css`
    box-shadow: 0 0 1px #183153;
  `,

  sun: css`
    svg {
      position: absolute;
      z-index: 1;
      inset-block-start: 6px;
      inset-inline-start: 36px;

      width: 24px;
      height: 24px;

      animation: rotate 15s linear infinite;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `,

  switch: css`
    position: relative;

    display: inline-block;

    width: 64px;
    height: 34px;

    font-size: 17px;
  `,
}));

export default useStyles;
