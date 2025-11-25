package com.bookfair.util;

import com.bookfair.entity.Reservation;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@Component
public class QRCodeGenerator {

    public BufferedImage generate(String text, int size) {
        QRCodeWriter writer = new QRCodeWriter();
        try {
            var bitMatrix = writer.encode(text, BarcodeFormat.QR_CODE, size, size);
            BufferedImage img = new BufferedImage(size, size, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < size; x++) {
                for (int y = 0; y < size; y++) {
                    img.setRGB(x, y, bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                }
            }
            return img;
        } catch (WriterException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateBase64(String text, int size) {
        BufferedImage qrImage = generate(text, size);
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(qrImage, "PNG", baos);
            byte[] imageBytes = baos.toByteArray();
            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert QR code to base64", e);
        }
    }

    public void generateForReservation(Reservation reservation){
        // placeholder: generate QR with reservation id
        generate("reservation:" + reservation.getId(), 250);
    }

    public String generateBase64ForReservation(Reservation reservation) {
        String qrData = "reservation:" + reservation.getId();
        return generateBase64(qrData, 250);
    }
}
