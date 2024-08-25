# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware



## Telemetry

- Crashes are due to improper json format received. Although it is just caused by 1 extra symbol, I will perceived as corrupted data and handle it as such.
- Users may want to know the last known sensor data recorded. So a simple cache sis stored on the server in the event of receiving corrupt data.
- Users need to know if the data is up to date in a live monitoring screen. So added indicator and lower the display opacity for visual cues.


Suggestion for own work:
- add a display gauge, animate the color change for better visualization.
- use a font with consistent character spacing for displaying the number.
- display the timestamp in some way for better understanding of connection status.

## Cloud