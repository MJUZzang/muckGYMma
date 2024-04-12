package mju.paygo.food.domain;

import org.springframework.web.multipart.MultipartFile;

public interface S3Uploader {

    String outerUpload(MultipartFile file, Long userId);
    void deleteS3Object(String url);
}
