package com.cocopay.redis.repository;

import com.cocopay.redis.key.BarcodeKey;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BarcodeKeyRepository extends CrudRepository<BarcodeKey,Integer> {
    Optional<BarcodeKey> findByBarcodeNum(String barcodeNum);
}
