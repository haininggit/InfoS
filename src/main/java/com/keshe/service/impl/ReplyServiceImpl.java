package com.keshe.service.impl;

import com.keshe.mapper.ReplyMapper;
import com.keshe.service.ReplyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @ClassName ReplyServiceImpl
 * @Description TODO
 * @Author Haining
 * @Date 2020/5/27 9:51
 * @Version 1.0
 */

@Service
public class ReplyServiceImpl implements ReplyService {
    @Resource
    private ReplyMapper replyMapper;
}
