package com.appointment.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService{

	private final ResourceLoader resourceLoader;

    public FileServiceImpl(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }


	@Override
	public String uploadImage(MultipartFile file){
		try {
		File saveFile=new ClassPathResource("static/img").getFile();
		Path path=Paths.get(saveFile.getAbsolutePath()+File.separator+file.getOriginalFilename());	
		Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		}catch(Exception e) {
			return "error";
		}
		return file.getOriginalFilename();
		
	}

	@Override
	public InputStream getResource(String path, String filename) {

		 Resource resource = resourceLoader.getResource("classpath:static/img/" + filename);
	      
	        try {
				return resource.getInputStream();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
	        
	}

}
