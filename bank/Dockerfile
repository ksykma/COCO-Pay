FROM openjdk:17
WORKDIR /app
COPY ./build/libs/bank-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]