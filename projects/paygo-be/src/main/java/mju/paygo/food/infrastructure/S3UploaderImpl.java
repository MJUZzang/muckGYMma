package mju.paygo.food.infrastructure;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mju.paygo.food.domain.S3Uploader;
import mju.paygo.food.exception.exceptions.FileConvertException;
import mju.paygo.food.exception.exceptions.FileExtensionExtractException;
import mju.paygo.food.exception.exceptions.FileTransferIOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3UploaderImpl implements S3Uploader {

    private static final String DIR_NAME = "food";
    private static final int EXTENSION_MINIMUM_INDEX = 1;
    private static final int NAME_MINIMUM_INDEX = 0;
    private static final String EXTENSION_SPLITTER = ".";

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.prefix}")
    private String prefix;

    @Override
    public String outerUpload(final MultipartFile file, final Long userId) {
        File uploadFile = convert(file, userId);
        return innerUpload(uploadFile, DIR_NAME);
    }

    private File convert(final MultipartFile file, final Long userId) {
        try {
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";

            int lastDotIndex = extractFileExtensionIndex(originalFileName);
            fileExtension = originalFileName.substring(lastDotIndex);
            originalFileName = originalFileName.substring(NAME_MINIMUM_INDEX, lastDotIndex);

            String encodedFileName = generateFileUrl(originalFileName, userId, fileExtension);
            File convertFile = new File(encodedFileName);
            removeNewFile(convertFile);

            if (convertFile.createNewFile()) {
                try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                    fos.write(file.getBytes());
                }
                return convertFile;
            }
            throw new FileConvertException();
        } catch (IOException exception) {
            throw new FileTransferIOException();
        }
    }

    private int extractFileExtensionIndex(final String originalFileName) {
        int lastDotIndex = Objects.requireNonNull(originalFileName).lastIndexOf(EXTENSION_SPLITTER);
        validateExistFileExtension(lastDotIndex);

        return lastDotIndex;
    }

    private void validateExistFileExtension(final int index) {
        if (index < EXTENSION_MINIMUM_INDEX) {
            throw new FileExtensionExtractException();
        }
    }

    private String generateFileUrl(final String originalFilename, final Long userId, final String fileExtension) throws IOException {
        return userId + "_" + URLEncoder.encode(originalFilename, StandardCharsets.UTF_8) + fileExtension;
    }

    private void removeNewFile(final File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private String innerUpload(final File uploadFile, final String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    private String putS3(final File uploadFile, final String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public void deleteS3Object(final String url) {
        String key = url.replace(prefix, "");
        amazonS3Client.deleteObject(bucket, key);
    }
}
