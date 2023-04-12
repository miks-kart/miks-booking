import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { numberWithCommas } from "./utils/NumberWithCommas";
import getItemTotalPrice from "./utils/GetItemTotalPrice";

// const URL = "";
const URL = "https://miks-conf.netlify.app";

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: URL + "/Rubik-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: URL + "/Rubik-SemiBold.ttf",
      fontWeight: 600,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    paddingTop: "6vw",
    paddingBottom: "6vw",
    paddingHorizontal: "9vw",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Rubik",
  },
  heading: {
    fontWeight: 400,
    fontSize: "3.5vw",
    textTransform: "uppercase",
    paddingBottom: "3vw",
  },
  image: { width: "20vw", objectFit: "contain" },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    width: "100%",
    height: "auto",
    paddingBottom: "5vw",
  },
  sectionEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  summaryTop: {
    padding: "1.8vw",
    borderTopLeftRadius: "1vw",
    borderTopRightRadius: "1vw",
    border: "0.12vw solid #D9D9D9",
  },
  summaryMiddle: {
    padding: "1.8vw",
    paddingBottom: "0.8vw",
    borderLeft: "0.12vw solid #D9D9D9",
    borderRight: "0.12vw solid #D9D9D9",
  },
  summaryBottom: {
    padding: "1.8vw",
    borderBottomLeftRadius: "1vw",
    borderBottomRightRadius: "1vw",
    border: "0.12vw solid #D9D9D9",
  },
  summaryTotal: {
    marginTop: "4.6vw",
    padding: "1.8vw",
    borderRadius: "1vw",
    border: "0.12vw solid #D50201",
  },
  summaryExtra: {
    padding: "1.8vw",
    border: "0.12vw solid #D9D9D9",
    borderBottom: "none",
  },
});

export default function PDF({
  conf,
  name,
  data,
  discounts,
  totalForSections,
  dates,
  cartOne,
  cartThree,
  cartThreeOptions,
  totalForSectionThree,
}) {
  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.image} src={URL + data.pdfData.logo} />
          <Text style={{ fontSize: "1.8vw" }}>
            {new Date()
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, ".")}
          </Text>
        </View>
        <Text style={styles.heading}>
          {data.pdfData.heading.dear}
          <Text style={{ color: "#8F8F8F" }}>
            {data.pdfData.heading.aya}
          </Text>{" "}
          {name}
          {conf ? data.pdfData.heading.thanksConf : data.pdfData.heading.thanks}
          {conf && (
            <Text style={{ fontWeight: "600" }}>
              {data.pdfData.heading.wait}
            </Text>
          )}
        </Text>
        <View
          style={{
            fontSize: "1.8vw",
            paddingBottom: "3vw",
          }}
        >
          <Text style={{ paddingBottom: "1vw" }}>
            {conf ? data.pdfData.soonConf : data.pdfData.soon}
          </Text>
          <Text
            style={{
              color: "#D50201",
              fontWeight: "600",
              paddingBottom: "1vw",
            }}
          >
            {data.pdfData.phone}
          </Text>
          <Text style={{ paddingBottom: "1vw" }}>{data.pdfData.mailUs}</Text>
          <Text style={{ color: "#D50201", fontWeight: "600" }}>
            {data.pdfData.email}
          </Text>
          <Text style={{ paddingTop: "3vw" }}>
            {conf ? data.pdfData.detailsConf : data.pdfData.details}
          </Text>
        </View>

        {(totalForSections.one ||
          totalForSections.dateOne > 0 ||
          discounts.one === 1) && (
          <>
            <View style={styles.summaryTop}>
              <View style={[styles.flexContainer, { paddingBottom: "1.8vw" }]}>
                <Text
                  style={{
                    fontSize: "3vw",
                    textTransform: "uppercase",
                  }}
                >
                  {data.collapsibleOne.title}
                </Text>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  src={URL + data.pdfData.summaryIcons.one}
                  style={{ width: "3vw", height: "3vw" }}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {data.smallTexts.youChose}
                </Text>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {data.smallTexts.price}
                </Text>
              </View>
            </View>
            <View style={styles.summaryMiddle}>
              {typeof totalForSections.dateOne === "number" &&
                !isNaN(totalForSections.dateOne) &&
                totalForSections.dateOne > 0 && (
                  <View
                    style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                  >
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      {data.collapsibleOne.titleForSummary}{" "}
                      <Text
                        style={{
                          fontSize: "1.4vw",
                          fontWeight: "600",
                          color: "#8F8F8F",
                        }}
                      >
                        {`${dates.dateOne.date.day
                          .toString()
                          .padStart(2, "0")}.${dates.dateOne.date.month
                          .toString()
                          .padStart(2, "0")} (${capitalizeFirstLetter(
                          new Intl.DateTimeFormat("ru", {
                            weekday: "long",
                          }).format(new Date(dates.dateOne.date.iso))
                        )}), ${data.smallTexts.time} ${
                          (dates.dateOne.time[0] * 2) % 2 !== 0
                            ? dates.dateOne.time[0] - 0.5 + ":30"
                            : dates.dateOne.time[0] + ":00"
                        }-${
                          (dates.dateOne.time[1] * 2) % 2 !== 0
                            ? dates.dateOne.time[1] - 0.5 + ":30"
                            : dates.dateOne.time[1] + ":00"
                        }`}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {`${numberWithCommas(totalForSections.dateOne)} р.`}
                    </Text>
                  </View>
                )}
              {cartOne.map((item, i) => (
                <View
                  key={i}
                  style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                >
                  <Text
                    style={{
                      fontSize: "1.4vw",
                    }}
                  >
                    {item.heading}
                    <Text
                      style={{
                        fontSize: "1.4vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {item.amount > 1 && ` ${item.amount}x`}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: "1.4vw",
                      fontWeight: "600",
                      color: "#8F8F8F",
                    }}
                  >
                    {item.from === "true" && "От "}
                    {`${numberWithCommas(getItemTotalPrice(item))} р.`}
                  </Text>
                </View>
              ))}
            </View>

            {discounts.one !== 0 && (
              <View>
                <View style={styles.summaryExtra}>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      {data.smallTexts.total}
                    </Text>
                    <Text
                      style={{
                        fontSize: "2.1vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {`${numberWithCommas(totalForSections.one)} р.`}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryExtra}>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      Скидка
                    </Text>
                    <Text
                      style={{
                        fontSize: "2.1vw",
                        fontWeight: "600",
                        color: "#D50201",
                      }}
                    >
                      {`-${Math.round(discounts.one * 100)}%`}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.summaryBottom}>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {discounts.one === 0
                    ? data.smallTexts.total
                    : data.smallTexts.totalWithDiscount}
                </Text>
                <Text
                  style={{
                    fontSize: "2.1vw",
                    fontWeight: "600",
                  }}
                >
                  {`${numberWithCommas(
                    Math.round(totalForSections.one * (1 - discounts.one))
                  )} р.`}
                </Text>
              </View>
            </View>
          </>
        )}

        {(totalForSections.dateTwo > 0 || discounts.two === 1) && (
          <>
            <View style={[styles.summaryTop, { marginTop: "3vw" }]}>
              <View style={[styles.flexContainer, { paddingBottom: "1.8vw" }]}>
                <Text
                  style={{
                    fontSize: "3vw",
                    textTransform: "uppercase",
                  }}
                >
                  {data.collapsibleTwo.title}
                </Text>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  src={URL + data.pdfData.summaryIcons.two}
                  style={{ width: "4.2vw" }}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {data.smallTexts.youChose}
                </Text>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {data.smallTexts.price}
                </Text>
              </View>
            </View>
            <View style={styles.summaryMiddle}>
              {typeof totalForSections.dateTwo === "number" &&
                !isNaN(totalForSections.dateTwo) &&
                totalForSections.dateTwo > 0 && (
                  <View
                    style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                  >
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      {data.collapsibleTwo.titleForSummary}{" "}
                      <Text
                        style={{
                          fontSize: "1.4vw",
                          fontweight: "600",
                          color: "#8F8F8F",
                        }}
                      >
                        {`${dates.dateTwo.date.day
                          .toString()
                          .padStart(2, "0")}.${dates.dateTwo.date.month
                          .toString()
                          .padStart(2, "0")} (${capitalizeFirstLetter(
                          new Intl.DateTimeFormat("ru", {
                            weekday: "long",
                          }).format(new Date(dates.dateTwo.date.iso))
                        )}), ${data.smallTexts.time} ${
                          (dates.dateTwo.time[0] * 2) % 2 !== 0
                            ? dates.dateTwo.time[0] - 0.5 + ":30"
                            : dates.dateTwo.time[0] + ":00"
                        }-${
                          (dates.dateTwo.time[1] * 2) % 2 !== 0
                            ? dates.dateTwo.time[1] - 0.5 + ":30"
                            : dates.dateTwo.time[1] + ":00"
                        }`}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {`${numberWithCommas(totalForSections.dateTwo)} р.`}
                    </Text>
                  </View>
                )}
            </View>

            {discounts.two !== 0 && (
              <View>
                <View style={styles.summaryExtra}>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      {data.smallTexts.total}
                    </Text>
                    <Text
                      style={{
                        fontSize: "2.1vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {`${numberWithCommas(totalForSections.dateTwo)} р.`}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryExtra}>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      Скидка
                    </Text>
                    <Text
                      style={{
                        fontSize: "2.1vw",
                        fontWeight: "600",
                        color: "#D50201",
                      }}
                    >
                      {`-${Math.round(discounts.two * 100)}%`}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.summaryBottom}>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {discounts.two === 0
                    ? data.smallTexts.total
                    : data.smallTexts.totalWithDiscount}
                </Text>
                <Text
                  style={{
                    fontSize: "2.1vw",
                    fontWeight: "600",
                  }}
                >
                  {`${numberWithCommas(
                    Math.round(totalForSections.dateTwo * (1 - discounts.two))
                  )} р.`}
                </Text>
              </View>
            </View>
          </>
        )}

        {(totalForSections.three || discounts.three === 1) && (
          <>
            <View style={[styles.summaryTop, { marginTop: "3vw" }]}>
              <View style={[styles.flexContainer, { paddingBottom: "1.8vw" }]}>
                <Text
                  style={{
                    fontSize: "3vw",
                    textTransform: "uppercase",
                  }}
                >
                  {data.collapsibleThree.title}
                </Text>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  src={URL + data.pdfData.summaryIcons.three}
                  style={{ width: "3vw" }}
                />
              </View>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {data.smallTexts.youChose}
                </Text>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {data.smallTexts.price}
                </Text>
              </View>
            </View>
            <View style={styles.summaryMiddle}>
              {cartThree.map((item, i) => (
                <View key={i} style={styles.flexContainer}>
                  <Text
                    style={{
                      fontSize: "1.4vw",
                      paddingBottom: "1vw",
                    }}
                  >
                    {item.heading}
                    {item.amount > 1 && (
                      <Text
                        style={{
                          fontSize: "1.4vw",
                          fontWeight: "600",
                          color: "#8F8F8F",
                        }}
                      >
                        {` ${item.amount}x`}
                      </Text>
                    )}
                  </Text>
                  <Text
                    style={{
                      fontSize: "1.4vw",
                      fontWeight: "600",
                      color: "#8F8F8F",
                    }}
                  >
                    {item.from === "true" && "От "}
                    {`${numberWithCommas(getItemTotalPrice(item))} р.`}
                  </Text>
                </View>
              ))}
            </View>
            {cartThree.length !== 0 && (
              <View style={styles.summaryExtra}>
                <View style={styles.flexContainer}>
                  <Text
                    style={{
                      fontSize: "1.4vw",
                    }}
                  >
                    {data.smallTexts.serviceFee}
                  </Text>
                  <Text
                    style={{
                      fontSize: "1.4vw",
                      fontWeight: "600",
                      color: "#8F8F8F",
                    }}
                  >
                    {`${numberWithCommas(
                      Math.round(totalForSectionThree / 10 / 1.1)
                    )} р.`}
                  </Text>
                </View>
              </View>
            )}
            {cartThreeOptions.length > 0 && (
              <View style={[styles.summaryExtra, { paddingBottom: "0.8vw" }]}>
                {cartThreeOptions.map((item, i) => (
                  <View
                    key={i}
                    style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                  >
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      {item.heading}
                    </Text>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {item.from === "true" && "От "}
                      {item.price
                        ? `${numberWithCommas(getItemTotalPrice(item))} р.`
                        : data.smallTexts.negotiable.desktop}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {discounts.three !== 0 && (
              <View>
                <View style={styles.summaryExtra}>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      {data.smallTexts.total}
                    </Text>
                    <Text
                      style={{
                        fontSize: "2.1vw",
                        fontWeight: "600",
                        color: "#8F8F8F",
                      }}
                    >
                      {`${numberWithCommas(totalForSections.three)} р.`}
                    </Text>
                  </View>
                </View>
                <View style={styles.summaryExtra}>
                  <View style={styles.flexContainer}>
                    <Text
                      style={{
                        fontSize: "1.4vw",
                      }}
                    >
                      Скидка
                    </Text>
                    <Text
                      style={{
                        fontSize: "2.1vw",
                        fontWeight: "600",
                        color: "#D50201",
                      }}
                    >
                      {`-${Math.round(discounts.three * 100)}%`}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.summaryBottom}>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "1.4vw",
                    fontWeight: "600",
                  }}
                >
                  {discounts.three === 0
                    ? data.smallTexts.total
                    : data.smallTexts.totalWithDiscount}
                </Text>
                <Text
                  style={{
                    fontSize: "2.1vw",
                    fontWeight: "600",
                  }}
                >
                  {`${numberWithCommas(
                    Math.round(totalForSections.three * (1 - discounts.three))
                  )} р.`}
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.summaryTotal}>
          <View style={styles.flexContainer}>
            <Text
              style={{
                fontSize: "2.1vw",
                fontWeight: "400",
                textTransform: "uppercase",
              }}
            >
              {conf ? (
                <>
                  {data.admin.totalSummOne}
                  <Text
                    style={{
                      fontSize: "2.1vw",
                      fontWeight: "400",
                      textTransform: "uppercase",
                      color: "#8F8F8F",
                    }}
                  >
                    {data.admin.totalSummTwo}
                  </Text>
                </>
              ) : (
                <>{data.smallTexts.totalSumm}</>
              )}
            </Text>
            <Text
              style={{
                fontSize: "2.1vw",
                fontWeight: "600",
              }}
            >
              {`${numberWithCommas(
                Math.round(totalForSections.one * (1 - discounts.one)) +
                  Math.round(totalForSections.dateTwo * (1 - discounts.two)) +
                  Math.round(totalForSections.three * (1 - discounts.three))
              )} р.`}
            </Text>
          </View>
        </View>

        <View
          style={{
            fontSize: "1.8vw",
            paddingBottom: "3vw",
            paddingTop: "6vw",
          }}
        >
          <Text style={{ paddingBottom: "1vw", lineHeight: "1.15" }}>
            {data.pdfData.coming}
          </Text>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={{ width: "13vw", paddingTop: "1.8vw" }}
            src={URL + data.pdfData.icons}
          />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={{ width: "16.67vw", paddingTop: "3vw" }}
            src={URL + data.pdfData.qr}
          />
        </View>
        <View style={styles.sectionEnd}>
          <Text style={{ fontSize: "1vw", color: "#8F8F8F" }}>
            {data.pdfData.copywright}
          </Text>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={{ width: "9vw", height: "auto", objectFit: "contain" }}
            src={URL + data.pdfData.logo}
          />
        </View>
      </Page>
    </Document>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
