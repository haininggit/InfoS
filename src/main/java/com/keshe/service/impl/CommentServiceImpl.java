package com.keshe.service.impl;

import com.keshe.mapper.CommentMapper;
import com.keshe.service.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @ClassName CommentServiceImpl
 * @Description TODO
 * @Author Haining
 * @Date 2020/5/27 9:44
 * @Version 1.0
 */

@Service
public class CommentServiceImpl implements CommentService {
    @Resource
    private CommentMapper commentMapper;
}
