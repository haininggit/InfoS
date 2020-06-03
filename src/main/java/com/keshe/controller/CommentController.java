package com.keshe.controller;

import com.keshe.service.CommentService;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description TODO
 * @Author gyhdx
 * @Date 2020/5/27 9:58
 */
@RestController
public class CommentController {

    @Resource
    private CommentService commentService;


}
