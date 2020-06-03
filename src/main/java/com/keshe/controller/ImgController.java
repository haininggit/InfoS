package com.keshe.controller;

import com.keshe.service.ImgService;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description TODO
 * @Author gyhdx
 * @Date 2020/5/27 10:00
 */
@RestController
public class ImgController {

    @Resource
    private ImgService imgService;
}
