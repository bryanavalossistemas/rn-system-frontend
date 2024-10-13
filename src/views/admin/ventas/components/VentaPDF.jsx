import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { formatCurrency, formatDateToLocal } from "@/utils/funciones";

export default function VentaPDF({ venta }) {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: "center" },

    addressTitle: {
      fontSize: 11,
      fontStyle: "bold",
      textTransform: "capitalize",
    },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });

  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image src="/logo.jpg" style={styles.logo} />
        <Text style={styles.reportTitle}>Representaciones Nataly S.A.C</Text>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>
            Cliente: {venta.cliente.nombre}
          </Text>
          <Text style={styles.addressTitle}>RUC: {venta.cliente.ruc}</Text>
        </View>
        <Text style={styles.addressTitle}>
          {formatDateToLocal(new Date(venta.fecha))}
        </Text>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Producto</Text>
      </View>
      <View style={styles.theader}>
        <Text>Precio Venta</Text>
      </View>
      <View style={styles.theader}>
        <Text>Cantidad</Text>
      </View>
      <View style={styles.theader}>
        <Text>Monto</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    venta.detallesVenta.map((detalleVenta) => (
      <Fragment key={detalleVenta.id}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{detalleVenta.producto.nombre}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{detalleVenta.precioVenta} </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{detalleVenta.cantidad}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {formatCurrency(detalleVenta.precioVenta * detalleVenta.cantidad)}
            </Text>
          </View>
        </View>
      </Fragment>
    ));

  const TableSubtotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text>Subtotal</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{formatCurrency(venta.subtotal)}</Text>
      </View>
    </View>
  );

  const TableIGV = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text>IGV</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{formatCurrency(venta.igv)}</Text>
      </View>
    </View>
  );

  const TableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.tbody}>
        <Text>Total</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{formatCurrency(venta.total)}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableSubtotal />
        <TableIGV />
        <TableTotal />
      </Page>
    </Document>
  );
}
