FROM reactnativecommunity/react-native-android:latest

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /app

COPY . /app

RUN npm ci

WORKDIR /app/android

RUN ./gradlew clean build
CMD mkdir -p /output && cp /app/android/app/build/outputs/apk/release/app-release.apk /output
