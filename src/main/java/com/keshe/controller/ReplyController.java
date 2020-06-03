package com.keshe.controller;

import com.keshe.service.RelationService;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description TODO
 * @Author gyhdx
 * @Date 2020/5/27 10:06
 */
@RestController
public class ReplyController {

    @Resource
    private RelationService relationService;
}
