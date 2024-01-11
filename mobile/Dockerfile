FROM reactnativecommunity/react-native-android:latest as build

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /app

COPY . /app

RUN npm ci

WORKDIR /app/android

RUN ./gradlew clean build


FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY --from=build /app/android/app/build/outputs/apk/release/app-release.apk /tmp/client.apk

CMD cp /tmp/app-release.apk /output
