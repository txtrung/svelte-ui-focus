<script>
    /* button */
    export let text = "",
      // type : primary , small , icon
      type = "",
      icon = "",
      to = "",
      // focus style button
      focusClass = {
        container: "green-button-focus",
        text: "white-text",
        icon: "white-icon",
        slot: "",
      },
      focusStyles = {
        container: {},
        text: {},
        icon: {},
        slot: {},
      },
      // normal style button
      styles = {
        container: {},
        text: {},
        icon: {},
      },
      className = { button: "", fontSize: "" },
      // @ts-ignore
      onReturn = null,
      name = "";
    /* focus */
    export let isDefaultFocus = false,
      id = "",
      value = "",
      nameUpCol = "",
      nameDownCol = "",
      outFocusId = "",
      // @ts-ignore
      next = null,
      // @ts-ignore
      prev = null,
      // @ts-ignore
      down = null,
      // @ts-ignore
      up = null,
      parentId = "",
      parentVertical = "",
      scrollPosition = "",
      scrollPositionValue = "";
    import { focus } from "$stores/focus.js";
    import { formartInlineStyle } from "$utils/common.js";
    import { createEventDispatcher, getContext } from "svelte";
    import FocusComponent from "../global/FocusComponent.svelte";
  
    const dispatch = createEventDispatcher();
    let contextDispatch = name && getContext(`handleAction${name}Button`);
  
    let defaultButtonClassName = { button: "primary-button", fontSize: "h4-28" };
    switch (type) {
      case "widget": {
        defaultButtonClassName = {
          button: "widget-button",
          fontSize: "wv-text-25",
        };
        break;
      }
      case "widget-icon": {
        // @ts-ignore
        defaultButtonClassName = { button: "widget-icon-button widget-button" };
        break;
      }
      case "small": {
        defaultButtonClassName = { button: "small-button", fontSize: "h5-24" };
        break;
      }
      case "icon": {
        defaultButtonClassName = { button: "icon-button", fontSize: "" };
        break;
      }
    }
  </script>
  
  <FocusComponent
    let:isFocus={focus}
    {isDefaultFocus}
    {id}
    {value}
    {next}
    {prev}
    up={$focus.focusHistory[nameUpCol] || up}
    down={$focus.focusHistory[nameDownCol] || down}
    {parentId}
    {outFocusId}
    {scrollPosition}
    {scrollPositionValue}
    {parentVertical}
    onSubmit={() => {
      dispatch("click");
      name && contextDispatch && contextDispatch();
    }}
    {onReturn}
    onKeyDown={(keyCode) => {
      dispatch("keydown", { keyCode });
    }}
    onHover={(keyCode) => {
      dispatch("hover", { keyCode });
    }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={(event) => {
        dispatch("click");
        name && contextDispatch && contextDispatch(event);
      }}
      class="button {className.button || defaultButtonClassName.button} 
      {focus ? focusClass.container : ''}"
      style="
      {focus ? formartInlineStyle(focusStyles.container) : ''}
      {formartInlineStyle(styles.container)}"
    >
      <a
        href={to ? to : "javascript:void(0)"}
        class="button__link-to"
        style={focus ? formartInlineStyle(focusStyles.slot) : ""}
      >
        <slot
          name="content"
          isFocus={focus}
          style={focus ? formartInlineStyle(focusStyles.slot) : ""}
        />
      </a>
    </div>
  </FocusComponent>
  
  <!-- <style type="text/scss">
    @import "./button.scss";
  </style> -->
  