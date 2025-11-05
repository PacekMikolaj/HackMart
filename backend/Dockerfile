FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline
COPY . .
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*jar ./app.jar
ENV JAVA_OPTS=""
EXPOSE 8085
CMD ["sh","-c","java $JAVA_OPTS -jar app.jar"]
