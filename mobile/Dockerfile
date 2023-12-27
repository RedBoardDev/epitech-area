FROM reactnativecommunity/react-native-android:latest

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

WORKDIR /app

COPY . /app

RUN npm ci

WORKDIR /app/android

CMD ./gradlew clean build && mkdir -p /output && cp -R /app/android/app/build/outputs/apk/release /output
