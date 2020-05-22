import React from "react";
import ReactDOM from "react-dom";

import {
  InstrumentationProvider,
  instrumentationHandlers,
  createEventInstrumentation,
  Button,
  ThemeProvider,
  newskitLightTheme,
  EventTrigger,
  useInstrumentation,
} from "newskit";

const contextObject = {
  url: "www.my-amazing-website.com",
};
const instrumentation = createEventInstrumentation(
  [instrumentationHandlers.createConsoleHandler()],
  contextObject
);


const MyButton: React.FC = props => {
  const {fireEvent} = useInstrumentation();

  return (
    <Button
      {...props}
      onClick={() => {
        fireEvent({
          originator: "button",
          trigger: EventTrigger.Click,
        });
      }}
    >
      Hello, world!
    </Button>
  );
};

const Rail: React.FC<{
  label: string;
}> = ({ label }) => {
  // const { fireEvent } = useInstrumentation();

  return (
    <div>
      <InstrumentationProvider
        context={{
          pageArea: "rail",
          railName: label,
        }}
      >
        <MyButton />
      </InstrumentationProvider>
    </div>
  );
};

const App = () => (
  <ThemeProvider theme={newskitLightTheme}>
    <InstrumentationProvider {...instrumentation}>
      <Rail label="Some great rail" />
    </InstrumentationProvider>
  </ThemeProvider>
);

const element = document.getElementById("app");
ReactDOM.render(<App />, element);
