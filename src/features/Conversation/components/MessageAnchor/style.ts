import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    active: css`
      width: 32px;
      background-color: ${token.colorPrimary};
    `,
    anchor: css`
      cursor: pointer;

      flex-shrink: 0;

      width: 24px;
      height: 4px;
      border-radius: 2px;

      background-color: ${token.colorFillSecondary};

      transition: all 0.2s ease-in-out;

      &:hover {
        width: 32px;
        background-color: ${token.colorFill};
      }
    `,
    button: css`
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px;
      height: 32px;
      border: 1px solid ${token.colorBorder};
      border-radius: 50%;

      color: ${token.colorTextSecondary};

      background: ${token.colorBgContainer};
      box-shadow: ${token.boxShadowSecondary};

      transition: all 0.2s;

      &:hover {
        border-color: ${token.colorBorderSecondary};
        color: ${token.colorText};
        background: ${token.colorBgElevated};
      }

      &:active {
        transform: scale(0.95);
      }
    `,
    container: css`
      pointer-events: none; /* Let clicks pass through to container if not on buttons/anchors */

      position: absolute;
      z-index: 100;
      inset-block-start: 50%;
      inset-inline-end: 12px;
      transform: translateY(-50%);

      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;

      width: 40px;
      height: 60%;

      /* Only enable pointer events on children */
      & > * {
        pointer-events: auto;
      }
    `,
    scrollTrack: css`
      scrollbar-width: none; /* Firefox */

      overflow-y: auto;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 2px;
      align-items: center;

      width: 100%;
      padding-block: 4px;
      padding-inline: 0;

      &::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
      }
    `,
    tooltip: css`
      max-width: 300px;
      word-break: break-all;
    `,
  };
});
