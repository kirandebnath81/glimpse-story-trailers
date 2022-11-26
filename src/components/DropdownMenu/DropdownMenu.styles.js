import styled from "styled-components";

export const Menu = styled.div`
  position: relative;

  .menu__menu-icon {
    font-size: 1.3rem;
    font-weight: bold;
    cursor: pointer;
  }
  .menu__container {
    position: absolute;
    top: 34px;
    right: 0px;
    z-index: 2;
    background-color: var(--background-color);
    color: var(--text-color);
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
    .menu__dropdown-item {
      padding: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background-color: var(--hover-background-color);
      }
      .menu__dropdown-icon {
        font-size: 1.3rem;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
      }
    }
  }
`;
