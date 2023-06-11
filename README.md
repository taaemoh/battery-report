# Batteries report

This test was built with Typescript using React and functional components.

The project is divided into 4 main folders inside `/src` as follows: `components`, `features`, `services`, `__tes__` and `helpers`
- The `components` folder  is the folder that contains the reusable UI components like `<List>` and `<LoadingSection>` anything that sits here should be a UI component that is not coupled to any specific module or functionality.
- The `features` folder which contains the functionalities of the solution, all functionalities (modules) should be placed inside this folder. There's only one sub folder inside this folder because we only have one feature in this app which is displaying the schools with faulty devices.
- The `services` folder should contain all the services, like `readFileContent` or any other service needed.
- The `helpers` folder which includes all the utils and useful helper functions that components use, things like sorting and manipulating data.
- The `__tes__` folder which contains the tests.


# commands
to run the project please clone it and then install the dependencies using
```
npm install

```

to run the project
```
npm start

```

to run the tests
```
npm run test

```

# Re-usable components
## List and List.Item
One of the useful reusable components is `List` which can be used for displaying any list of items. items can be added with the `List.Item` component.
```
<List>
  <List.Item>...</List.Item>
  <List.Item>...</List.Item>
  <List.Item>...</List.Item>
  ..
</List>
```

## LoadingSection
A reusable component that gets displayd whenever we're getting the data from the hard disk, since this operation happens really fast we can barely see that component flashing for a split second when the app loads. we can set the required text that shows while loading by using the `message` prop.
```
<LoadingSection message="...Loading..." />
```
# The solution
The solution of this problem can be generally divided into the following steps:
  - After reading data, we need to group data points by device.. this is done by calling `groupItemsByKey` which will return a Map of data points grouped by serial number.
  - After getting data grouped together, we need to extract a sample of data per device that is good enough for measurements. Since most devices get recharged freuqntly, we need to extract a range of consequent measurements that don't include any recharge, in order to do this we divide the data into ranges and then pick the largest range, this ranges will be a group of readings uninterrupted by recharge, and it will be the longest uninterrupted range among other ranges per device. these ranges are obtained by calling `getMeasurableRanges` function.
  - After getting the appropriate measurable ranges, now it's time to calculate the average consumption per device, this is done by calling the function `calculateDeviceDailyAvgConsumption` which calculates the amount of hours per range, and the amount of battery drain per that set of hours, and then gets the drain percentage for 24 hours.
  - The threshold for a battery to be considere faulty is 30%, the solution has made this threshold dynamic, so we can define the value we want. the value is set as 30% as required for this test, we can adjust that value by changing this variable `FAULTY_BATTERY_THRESHOLD`.
  - After getting the percentage of daily battery drain per device, and identifying batteris that need change, now we're done with data manipulation and we need to build a simple react state out of this data, this is done by calling `prepareState`.
  - After getting the state ready we set the state and we get the result displyed.
  - Note: In some cases there's only one single data point per device, such cases were ignored from the report because they don't provide enough data for measurement. this is done by assigning the value of -1 to the daily batery drain percentage.
  
# Architecture and design patterns
- There's another way to solve this coding challenge, but this other approach involves using `Lodash` which requires loading external dependencies. I chose not to follow this because in general it's always recommended to cut the use of external dependencies if we can achieve the same results with native javascript functions.

- React `Compound components` design pattern was mainly used for `List`. This pattern provides a nice and clean approach to manage components that naturally go toether like `List` and `ListItem`. This is very popular pattern in UI libraries.

- Global application error handling is provided by implementing a `ReactBoundary` class component. This component will act as a net that catches unexpected errors and display a user friendly error screen. In a real production system this class can be used to log errors into some cloud monitoring service like Sentry, or trigger incident management systems so that the tech team can be notified immediately about any unexpected errors.


# Screenshots

![GitHub Logo](/resources/screenshot.png)